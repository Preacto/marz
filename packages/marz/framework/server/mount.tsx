import React from "react"

export default function Marz({
	children,
	clientEntryScript,
	clientRouterScript,
}: { children: React.ReactNode; clientEntryScript: string; clientRouterScript: string }) {
	return (
		<html lang="en">
			<head>
				<title>Marz</title>
				{/* TODO: "Head" component to let user add stuff to head */}
				<link rel="stylesheet" href="/main.css" />
			</head>
			<body>
				<main id="__MARZ_MOUNT">{children}</main>
				<script
					/* credit: https://github.com/threepointone/server-components-demo/blob/esbuild-take-2/src/Html.js */
					// biome-ignore lint/security/noDangerouslySetInnerHtml: static script, no user input
					dangerouslySetInnerHTML={{
						__html: `
						global = window;
				
						const __bun__module_map__ = new Map();
				
						// we just use webpack's function names to avoid forking react
						global.__webpack_chunk_load__ = async function(moduleId) {
							const mod = await import(moduleId);
							__bun__module_map__.set(moduleId, mod);
							return mod;
						};
				
						global.__webpack_require__ = function(moduleId) {
							// TODO: handle non-default exports
							console.log("require", moduleId)
							return __bun__module_map__.get(moduleId);
						};`,
					}}
				/>
				<script type="module" src={clientEntryScript} />
			</body>
		</html>
	)
}
