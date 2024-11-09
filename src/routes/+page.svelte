<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function roundOrBlank(val: number | null) {
		if (val == null) {
			return '';
		} else {
			return Math.round(val);
		}
	}
</script>

<main>
	<h1>Fires</h1>
	{#if data.fires.length != 0}
		<table>
			<thead>
				<tr>
					<th align="left">Fire</th>
					<th align="left">County</th>
					<th align="right">Acres Burned</th>
					<th align="right">Containment</th>
				</tr>
			</thead>
			<tbody>
				<tr><td></td></tr>
				{#each data.fires as fire}
					<tr>
						<td class:unnamed={fire.attributes.attr_IncidentName?.startsWith('FD')}
							>{fire.attributes.attr_IncidentName}</td
						>
						<td>{fire.attributes.attr_POOCounty}</td>
						<td align="right">{roundOrBlank(fire.attributes.attr_IncidentSize)}</td>
						<td align="right"
							>{#if fire.attributes.attr_PercentContained}
								{fire.attributes.attr_PercentContained}%
							{/if}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<i>No reported fires!</i>
	{/if}
</main>

<footer>
	<p>
		<b>THIS IS NOT A LIFE SAFETY RESOURCE</b> <br />
		If you believe you or someone you know is in danger, please get information directly from local authorities.
	</p>
	<p>
		Source: <a
			href="https://data-nifc.opendata.arcgis.com/datasets/nifc::wfigs-current-interagency-fire-perimeters/about"
		>
			WFIGS Current Interagency Fire Perimeters
		</a>
		(<a href="https://www.nifc.gov/">NIFC</a>)
	</p>
	<p>
		This site was heavily inspired by <a href="http://whereiscaliforniaonfire.com/"
			>whereiscaliforniaonfire.com</a
		>. <br />
		<small>Contact: <a href="mailto:fire@gizm0.dev">fire@gizm0.dev</a></small>
	</p>
</footer>

<style>
	* {
		font-family: Arial, sans-serif;
	}

	table {
		border-collapse: collapse;
		table-layout: auto;
		font-size: 24px;
		margin-bottom: 40px;
	}

	td,
	th {
		font-weight: normal;
		padding-left: 20px;
		padding-right: 20px;
	}
	thead tr:first-child {
		font-weight: normal;
		border-bottom: solid black 1px;
	}
	tr:nth-child(even) {
		background-color: #f5f5f5;
	}

	tr:hover {
		font-weight: bolder;
	}

	.unnamed {
		/* font-style: italic; */
		color: #666;
	}
</style>
