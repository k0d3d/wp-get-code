// @ts-expect-error defined
export const getCodeApp = typeof window.GetCodeAppVars != "undefined" ? window.GetCodeAppVars : {};
