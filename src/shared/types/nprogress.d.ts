declare module 'nprogress' {
  const NProgress: {
    start: () => void
    done: () => void
    configure: (options: { showSpinner?: boolean; trickleSpeed?: number }) => void
    inc: () => void
    set: (n: number) => void
  }
  export default NProgress
}
