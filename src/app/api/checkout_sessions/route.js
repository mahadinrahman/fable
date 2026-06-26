import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { getDetailsBook } from '@/lib/api/books';
import { getUserSession } from '@/lib/core/session';



export async function POST(req) {
  try {
    const user = await getUserSession();

    const headersList = await headers();
    const origin = headersList.get('origin');


    const formData = await req.formData();
    const bookId = formData.get("bookId");

    const book = await getDetailsBook(bookId);
    
    if (!user) {
  return NextResponse.redirect(
    new URL('/signin', origin),
    303
  );
}


    if (user?.email === book?.userEmail) {
     return NextResponse.redirect(`${origin}/books/${book._id}?error=own_book`, 303);
    }

    const session = await stripe.checkout.sessions.create({
      customer_email:user?.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: book.title,
            },
            unit_amount: Math.round(Number(book.price) * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/books/${book._id}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/books/${book._id}`,

      metadata: {
        buyerId: (user?.id || user?._id).toString(),
        buyerEmail: user?.email,
        buyerName: user?.name,
        bookId: book._id.toString(),
        bookTitle: book.title,
        bookPrice: book.price.toString(),
        bookImageIcon: book.coverImageUrl,
        bookGenre: book.genre,
        sellerEmail: book.userEmail
      }
    });

    return NextResponse.redirect(session.url, 303);

  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}