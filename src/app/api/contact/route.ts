import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactEmail } from '../../../utils/emailService';

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  service: z.string().min(1),
  details: z.string().optional().or(z.literal('')),
});

export async function POST(request: NextRequest) {
  try {
    console.log('📩 Contact form submission received...');
    
    const body = await request.json();
    console.log('📝 Form data received:', { name: body.name, email: body.email });
    
    // Validate the request body
    const validatedData = contactFormSchema.parse(body);
    console.log('✅ Form validation passed');

    // Send email notification
    console.log('📧 Attempting to send email...');
    await sendContactEmail(validatedData);
    console.log('✉️ Email sent successfully!');

    return NextResponse.json(
      { message: 'Your request has been received. We will contact you soon.' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Validation error:', error.issues);
      return NextResponse.json(
        { error: 'Invalid form data', details: error.issues },
        { status: 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Contact form error:', errorMessage, error);
    return NextResponse.json(
      { error: errorMessage || 'Internal server error' },
      { status: 500 }
    );
  }
}
