
<template>
	<div>
		<page-header/>
		<!--input v-model="msg">
		<p>prop: {{propMessage}}</p>
		<p>msg: {{msg}}</p>
		<p>helloMsg: {{helloMsg}}</p>
		<p>computed msg: {{routes}}</p>
		<button @click="greet">Greet me!</button-->
		<div class="columns">
			<div class="column">
			</div>
		</div>
		<div class="columns">
			<div class="column messages hero is-fullheight">
				<div class="container">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import App from './App'
export default App
</script>

