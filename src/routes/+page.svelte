<script lang="ts">
	import { sections } from '$lib/index';
	import { onMount } from 'svelte';
	import malware from '../img/icons8-malware-66.png';
	import './../app.css';

	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	onMount(() => {
		const randomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))],
			randomString = (length: Number) => Array.from(Array(length)).map(randomChar).join('');

		const card = document.querySelector('.card') as HTMLElement,
			letters = card.querySelector('.card-letters') as HTMLElement;

		const handleOnMove = (e: any) => {
			const rect = card.getBoundingClientRect(),
				x = e.clientX - rect.left,
				y = e.clientY - rect.top;

			letters.style.setProperty('--x', `${x}px`);
			letters.style.setProperty('--y', `${y}px`);

			letters.innerText = randomString(1500);
		};

		card.onmousemove = (e) => handleOnMove(e);

		card.ontouchmove = (e) => handleOnMove(e.touches[0]);
	});
</script>

<div class="main">
	<div class="card-track">
		<div class="card-wrapper">
			<div class="card">
				<div class="card-title">
					<h1>Emotet</h1>
					<img src={malware} alt="malware" />
				</div>
				<div class="card-gradient" />
				<div class="card-letters" />
			</div>
		</div>
	</div>
	<div class="links">
		{#each sections as section}
			<a href="/sections/{section}">{section}</a>
		{/each}
	</div>
</div>

<style>
	.main {
		width: 100vw;
		min-height: 100vh;
		height: fit-content;
		overflow-y: auto;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}
	.main h1 {
		position: absolute;
		z-index: 5;
	}
	.links {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.links a {
		background-color: var(--primary100);
		color: var(--primary800);
		padding-inline: 6px;
		padding-block: 4px;
		border-radius: 8px;
	}
	.links a:hover {
		background-color: var(--primary400);
	}
	@media screen and (width <768px) {
		.main {
			flex-direction: column;
		}
		.links {
			display: flex;
			flex-direction: column;
			gap: 10px;
			width: 80%;
		}
	}
</style>
