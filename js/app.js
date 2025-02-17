const { createApp, reactive, computed } = Vue;

const DEFAULT_STATE = {
	state:true,
	inputName:'',
	names:[],
	error:'',
	showError: false,
	result:''
}

createApp({
	setup(){
		const data = reactive(DEFAULT_STATE)

		const isReady = computed(() => {
			return data.names.length > 1;
		})

		///methods
		const addNameToList = () => {
			const userName = data.inputName;

			if(validate(userName)) {
			data.names.push(userName);
			data.inputName = '';
			data.showError = false;
			} else {
				data.showError = true;
			}
		}

		const validate = (value) => {
			data.error = '';
			if(value === ''){
				data.error = 'Empty'
				return false
			}
			if(data.names.includes(value)){
				data.error = 'Duplicate'
				return false
			}

			return true
		}

		const getRandomName = () => {
			return data.names[Math.floor(Math.random() * data.names.length)];
		}
		const generateResult = () => {
			let rand = getRandomName();
			if(data.result !== ''){
				while(rand === data.result){
					rand = getRandomName();
				}
			}
			data.result = rand
		}

		const removeName = (index) => {
			data.names.splice(index, 1)
		}

		const showResults = () => {
			generateResult();
			data.state = false;
		}

		const resetApp = () => {
			data.state = true;
			data.inputName = '';
			data.names = [];
			data.error = '';
			data.showError =  false;
			data.result = ''
		}

		const getNewResult = () => {
			generateResult()
		}

		return {
			data,
			addNameToList,
			removeName,
			isReady,
			showResults,
			resetApp,
			getNewResult
		}
	}
}).mount('#app')