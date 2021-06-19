import { useEffect, useState } from 'react';

export const Comments = () => {

	// Courtesy Dhanraj Padmashali https://dhanrajsp.me/blog/adding-comments-to-my-blog

	const commentNodeId = 'comments';

	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (!visible) return;
		// docs - https://utteranc.es/
		const script = document.createElement('script');
		script.src = 'https://utteranc.es/client.js';
		script.async = true;
		script.setAttribute('repo', 'openworkwiki/Open-Work');
		script.setAttribute('issue-term', 'title');
		script.setAttribute('label', '[Auto]');
		script.setAttribute('theme', 'github-light');
		script.setAttribute('crossorigin', 'anonymous');

		const scriptParentNode = document.getElementById(commentNodeId);
		scriptParentNode.appendChild(script);

		return () => {
			// cleanup - remove the older script with previous theme
			scriptParentNode.removeChild(scriptParentNode.firstChild);
		};
	}, [visible]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setVisible(true);
					}
				});
			},
			{
				threshold: 1,
			}
		);
		observer.observe(document.getElementById(commentNodeId));
	}, [commentNodeId]);

	console.log('hi')

	return <div id={commentNodeId} />;
};