<script lang="ts">
	import { sections } from '$lib/index';
	import { page } from '$app/stores';
	import Reveal from '$lib/reveal.svelte';
	$: decodedLocation = '';
	$: neigbors = findNeigbors($page.url.pathname);
	function findNeigbors(pathname: string) {
		let location = pathname.split('/').at(-1)!;
		decodedLocation = decodeURIComponent(location);
		const currentIndex = sections.indexOf(decodedLocation);
		return [sections[currentIndex - 1], sections[currentIndex + 1]];
	}
</script>

<div class="section">
	<div class="navbar">
		<a href="/">Emotet</a>
		<h4>{decodedLocation}</h4>
		<div>
			{#if neigbors[0]}
				<a href="/sections/{neigbors[0]}">Previous</a>
			{/if}
			{#if neigbors[1]}
				<a href="/sections/{neigbors[1]}">Next</a>
			{/if}
		</div>
	</div>

	<div class="content">
		{#key $page.url.pathname}
			<Reveal mdFile={decodedLocation} />
		{/key}
	</div>
</div>

<style>
	.section {
		width: 100vw;
		height: 90vh;
		display: flex;
		flex-direction: column;
	}

	.section .content {
		width: 100%;
		flex-grow: 1;
	}

	.section .navbar {
			width: 100%;
			height: 80px;
			align-items: center;
			justify-content: space-between;
			padding-inline: 5%;
			display: flex;
			z-index: 99;
			position: fixed;
	}

	.section div:first-child h4 {
		color: var(--primary800);
	}
	.section div:first-child {
		width: 100%;
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-inline: 5%;
	}

	.section > div > a {
		font-size: var(--h3);
	}

	.section > div > div > a {
                font-size: var(--h4);
                font-size: 1rem;
                margin-left: 10px;
                margin-left: 10px;
                gap: 10px;
	}
	.section > div > div{
			border: 1px solid rgb(39, 39, 39);
			background-color: rgb(20, 20, 20);
			padding: 5px;
			padding-right: 15px;
			border-radius: 20px;
	}
        
	.section > div > div > a:hover {
		color: var(--primary800);
	}

	@media screen and (width <768px) {
		.section div:first-child h4 {
			display: none;
		}
	}
</style>
