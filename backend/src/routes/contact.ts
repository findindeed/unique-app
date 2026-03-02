import { Router, Request, Response } from 'express';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const { name, email, message, phone } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide name, email and message.' });
  }

  console.log('New Contact Form Submission:', { name, email, message, phone });

  // Here you would typically send an email using Nodemailer or save to a database
  
  res.status(200).json({ 
    success: true, 
    message: 'Thank you for your message. We will get back to you soon!' 
  });
});

export default router;
