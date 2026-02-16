// import 'server-only';
// export const runtime = 'nodejs';
export const runtime = process.env.NEXT_RUNTIME ;


import { PutObjectCommand } from '@aws-sdk/client-s3';
import chromium from '@sparticuz/chromium-min';
import axios, { AxiosResponse } from 'axios';
import ejs from 'ejs';
// import fs from 'fs';
// import MarkdownIt from 'markdown-it';
// import path from 'path';
import puppeteer from 'puppeteer-core';

import { s3 } from '@/configs/awsConfig';
import { CANDIDATE_API } from '@/constants';
import { CandidateResponse, CandidateResult } from '@/types';
import { advancedTestPdfContent } from '@/utils';

// const md = new MarkdownIt({ html: false, linkify: true, typographer: true, });


export async function renderIntermediateReportCard(
  candidateResult: CandidateResult
): Promise<string> {

  try {
    console.log('Function entered');

    // const templatePath = path.join(
    //   process.cwd(),
    //   'templates',
    //   'intermediateReportCardTemplate.ejs'
    // );

    console.log('Path built:', candidateResult);
    let html = '';
    try {
      // html = ejs.render(intermediateEjs, { 
      //   ...candidateResult, 
      // });
      html = ejs.render('<h1>Test</h1>', {});
  console.log('Simple render works');
    } catch (error) {
      console.error('EJS Error:', error);
      console.error('Stack:', error);
    }
    console.log('Current runtime:', runtime);
    console.log('EJS rendered successfully');
    console.log('What is ejs?', ejs);
console.log('Type:', typeof ejs);
console.log('Is it a function?', typeof ejs === 'function');
console.log('Has render?', typeof ejs?.render);
console.log('Keys:', Object.keys(ejs || {}));

// If ejs.render doesn't exist, try:
// console.log('Direct render?', typeof ejs?.default?.render);
    return html;
  } catch (err) {
    console.error('REPORT CARD ERROR:', err);
    throw err;
  }
}


// export async function renderAdvancedReportCard(
//   candidateResult: CandidateResult
// ): Promise<string> {
//   const templatePath = path.join(
//     process.cwd(),
//     'templates',
//     'demo.ejs'
//   );

//   // const candidateResultMarkdown = {
//   //   ...candidateResult,
//   //   sections: (candidateResult.sections ?? []).map((section) => ({
//   //     ...section,
//   //     questions: (section.questions ?? []).map((question) => ({
//   //       ...question,
//   //       problemStatement: md.render(question.problemStatement ?? ''),
//   //     })),
//   //   })),
//   // };

//   console.log(templatePath, candidateResult);

//   // const template =await fs.readFil/eSync(templatePath, 'utf-8');
//   return await ejs.renderFile(templatePath);

//   return 'ejs.renderFile(templatePath, candidateResultMarkdown);';
// }


//   candidateResult: CandidateResult
// ): Promise<string> {

//   const templatePath = path.join(
//     process.cwd(),
//     'templates',
//     'advancedReportCardTemplate.ejs'
//   );

//   const template = fs.readFileSync(templatePath, 'utf-8');

//   return ejs.render(template, {
//     ...candidateResult,
//   });
// }

// const isLocal = !!process.env.EXECUTABLE_PATH;
async function submitService(candidateResult: CandidateResult) {
    try {
        const { candidateEmail, problemLevel, percentage } = candidateResult;

        const isProduction = process.env.VERCEL_ENV === 'production';

        const browser = await puppeteer.launch({
            args: isProduction ? chromium.args : puppeteer.defaultArgs(),
            defaultViewport: chromium.defaultViewport,
            executablePath: isProduction ? await chromium.executablePath(process.env.PROD_EXECUTABLE_PATH) : process.env.EXECUTABLE_PATH || undefined,
            headless: chromium.headless,
        });
    
        const page = await browser.newPage();
    
        const pageContent = problemLevel ? problemLevel == 'Intermediate' ? await renderIntermediateReportCard(candidateResult) : advancedTestPdfContent(candidateResult) : await renderIntermediateReportCard(candidateResult);
    
        await page.setContent(pageContent, {
            waitUntil: 'networkidle0'
        });
    
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
              top: '20px',
              bottom: '20px',
              left: '20px',
              right: '20px',
            },
        });
    
        await browser.close();
    
        const bucketName = process.env.AWS_S3_BUCKET_NAME!;
        const safeEmail = candidateEmail.replace(/[^a-zA-Z0-9]/g, '_');
        const fileKey = `uploads/Report_${safeEmail}`;
    
        const uploadParams = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileKey,
            Body: pdf,
            ContentType: 'application/pdf',
            ACL: 'public-read'
        });
    
        await s3.send(uploadParams);
        const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    
        const candidateDetails: AxiosResponse<CandidateResponse> = await axios.patch(`${CANDIDATE_API}/update-candidate`, {
            email: candidateEmail,
            reportCard: fileUrl,
            percentage
        });

        return candidateDetails.data.data;
    } catch (error) {
        throw error;
    }
}

export default submitService;