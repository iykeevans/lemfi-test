export {};

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties extends Record<keyof typeof globalThis, any> {}
}
