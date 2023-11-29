import './Layout.scss';

export default function Layout({ children, title }) {
	return (
		<main className={`Layout ${title}`}>
			<h1>{title}</h1>
			{children}
		</main>
	);
}
