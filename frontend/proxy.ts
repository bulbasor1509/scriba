export function proxy(request: Request) {
    console.log("hello from proxy server");
}

export const config = {
    matcher: "/:path*"
}