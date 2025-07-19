
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const KUBERNETES_SERVICE_PORT: string;
	export const KUBERNETES_PORT: string;
	export const npm_config_user_agent: string;
	export const METAGPT_PROJECT_ROOT: string;
	export const MGX_CALLBACK_GRPC_HOST: string;
	export const PIP_PREFIX: string;
	export const HOSTNAME: string;
	export const npm_node_execpath: string;
	export const SHLVL: string;
	export const MGX_CHAT_PIP_PREFIX: string;
	export const HOME: string;
	export const MGX_VERSION: string;
	export const npm_package_json: string;
	export const COREPACK_ROOT: string;
	export const NODE_OPTIONS: string;
	export const METAGPT_TEMPLATE_PATH: string;
	export const LC_CTYPE: string;
	export const PLAYWRIGHT_CHROMIUM_USE_HEADLESS_NEW: string;
	export const MGX_USER_ID: string;
	export const pnpm_config_verify_deps_before_run: string;
	export const MGX_REAL_CHAT_WORKSPACE: string;
	export const npm_config_registry: string;
	export const USERNAME: string;
	export const MGX_STORAGE_ROOT: string;
	export const KUBERNETES_PORT_443_TCP_ADDR: string;
	export const npm_config_node_gyp: string;
	export const PATH: string;
	export const EMAIL: string;
	export const npm_package_name: string;
	export const npm_config_store_dir: string;
	export const NODE: string;
	export const KUBERNETES_PORT_443_TCP_PORT: string;
	export const npm_config_frozen_lockfile: string;
	export const MGX_KEEPALIVE_WINDOW: string;
	export const KMP_DUPLICATE_LIB_OK: string;
	export const KMP_INIT_AT_FORK: string;
	export const KUBERNETES_PORT_443_TCP_PROTO: string;
	export const MGX_CHAT_PATH: string;
	export const npm_lifecycle_script: string;
	export const MGX_CALLBACK_TOKEN: string;
	export const DEBIAN_FRONTEND: string;
	export const npm_package_version: string;
	export const npm_lifecycle_event: string;
	export const npm_config_verify_deps_before_run: string;
	export const NODE_PATH: string;
	export const SENTRY_ENABLE: string;
	export const KUBERNETES_SERVICE_PORT_HTTPS: string;
	export const SENTRY_ENVIRONMENT: string;
	export const SENTRY_DSN: string;
	export const KUBERNETES_PORT_443_TCP: string;
	export const CHAT_PYTHON_PATH: string;
	export const PWD: string;
	export const KUBERNETES_SERVICE_HOST: string;
	export const npm_execpath: string;
	export const IPYTHONDIR: string;
	export const PYTHONPATH: string;
	export const npm_config__jsr_registry: string;
	export const npm_command: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const TZ: string;
	export const MGX_CHAT_PYTHONPATH: string;
	export const INIT_CWD: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		KUBERNETES_SERVICE_PORT: string;
		KUBERNETES_PORT: string;
		npm_config_user_agent: string;
		METAGPT_PROJECT_ROOT: string;
		MGX_CALLBACK_GRPC_HOST: string;
		PIP_PREFIX: string;
		HOSTNAME: string;
		npm_node_execpath: string;
		SHLVL: string;
		MGX_CHAT_PIP_PREFIX: string;
		HOME: string;
		MGX_VERSION: string;
		npm_package_json: string;
		COREPACK_ROOT: string;
		NODE_OPTIONS: string;
		METAGPT_TEMPLATE_PATH: string;
		LC_CTYPE: string;
		PLAYWRIGHT_CHROMIUM_USE_HEADLESS_NEW: string;
		MGX_USER_ID: string;
		pnpm_config_verify_deps_before_run: string;
		MGX_REAL_CHAT_WORKSPACE: string;
		npm_config_registry: string;
		USERNAME: string;
		MGX_STORAGE_ROOT: string;
		KUBERNETES_PORT_443_TCP_ADDR: string;
		npm_config_node_gyp: string;
		PATH: string;
		EMAIL: string;
		npm_package_name: string;
		npm_config_store_dir: string;
		NODE: string;
		KUBERNETES_PORT_443_TCP_PORT: string;
		npm_config_frozen_lockfile: string;
		MGX_KEEPALIVE_WINDOW: string;
		KMP_DUPLICATE_LIB_OK: string;
		KMP_INIT_AT_FORK: string;
		KUBERNETES_PORT_443_TCP_PROTO: string;
		MGX_CHAT_PATH: string;
		npm_lifecycle_script: string;
		MGX_CALLBACK_TOKEN: string;
		DEBIAN_FRONTEND: string;
		npm_package_version: string;
		npm_lifecycle_event: string;
		npm_config_verify_deps_before_run: string;
		NODE_PATH: string;
		SENTRY_ENABLE: string;
		KUBERNETES_SERVICE_PORT_HTTPS: string;
		SENTRY_ENVIRONMENT: string;
		SENTRY_DSN: string;
		KUBERNETES_PORT_443_TCP: string;
		CHAT_PYTHON_PATH: string;
		PWD: string;
		KUBERNETES_SERVICE_HOST: string;
		npm_execpath: string;
		IPYTHONDIR: string;
		PYTHONPATH: string;
		npm_config__jsr_registry: string;
		npm_command: string;
		PNPM_SCRIPT_SRC_DIR: string;
		TZ: string;
		MGX_CHAT_PYTHONPATH: string;
		INIT_CWD: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
