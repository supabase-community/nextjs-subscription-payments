import { redirect } from 'next/navigation';
import { getDefaultSignInView } from '@/utils/auth-helpers/settings';
import { cookies } from 'next/headers';

export default async function SignIn() {
  const cookieStore = await cookies();
  const preferredSignInView =
    cookieStore.get('preferredSignInView')?.value || null;
  const defaultView = getDefaultSignInView(preferredSignInView);

  return redirect(`/signin/${defaultView}`);
}
