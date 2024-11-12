import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const actions = {
	oauth: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const provider = formData.get('provider');

		/**
		 * Sign-in will not happen yet, because we're on the server-side,
		 * but we need the returned url.
		 */
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${url.origin}/auth/callback`
			}
		});

		if (error) return fail(error);

		/* Now authorize sign-in on browser. */
		if (data.url) redirect(303, data.url);
	},
	signout: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut();
		redirect(303, '/');
	}
};
