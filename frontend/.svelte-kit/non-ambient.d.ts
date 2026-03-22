
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/chat" | "/login" | "/rag" | "/settings" | "/users" | "/users/[id]";
		RouteParams(): {
			"/users/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/chat": Record<string, never>;
			"/login": Record<string, never>;
			"/rag": Record<string, never>;
			"/settings": Record<string, never>;
			"/users": { id?: string };
			"/users/[id]": { id: string }
		};
		Pathname(): "/" | "/chat" | "/login" | "/rag" | "/settings" | "/users" | `/users/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}