// {
//     id: number
//     name: string
//     regex: string
//     flags: string
//     source: string
//     result: string
//     position: number
//     replace: string
// }


export const state = {
    currentStep: 0,
    steps: [
        {
            id: 0,
            regex: null,
            flags: 'gm',
            source: null,
            position: 0,
            replaceValue: null
        }
    ]
};
export const mutations = {
    setCurrentStep(state, stepId) {
        if (stepId == null)
            stepId = 0

        state.currentStep = stepId
    },
    setSteps(state, steps) {
        if (steps == null) steps = []
        state.steps = steps
    }
};
export const actions = {
    addStep({ commit, state }) {
        return new Promise((resolve, reject) => {
            let steps = state.steps;
            let step = {}

            let position = steps.push(step)
            step.position = position - 1
            step.id = Date.now() + Math.floor(Math.random() * 10000)

            step.flags = "gm"

            commit('setSteps', steps)

            resolve()
        })
    },
    calculateSteps({ commit, state }) {
        // return new Promise((resolve, reject) => {

        var steps = state.steps;
        var source = steps[0].source
        //if (steps.filter(x => x.regex == null || x.source == null || x.replaceValue == null).length == 0) {
        try {
            for (var step of steps) {
                if (step.regex) {
                    let regex = new RegExp(step.regex, step.flags)
                    step.result = source.replace(regex, step.replaceValue || '')
                    source = step.result
                }
            };
        }
        catch (e) {

        }

        //         resolve();
        //}
        //     reject()
        // })
    },
    removeCurrentStep({ commit, state, getters, dispatch }) {
        return new Promise((resolve, reject) => {
            let currentStep = getters['currentStep']
            let stepId = currentStep.id
            /**@type Array */
            let steps = state.steps
            let index = steps.findIndex(x => x.id == stepId)
            let previousStepId = 0;

            if (index == 0)
                previousStepId = steps[index + 1].id
            else
                previousStepId = steps[index - 1].id
            commit('setCurrentStep', previousStepId)
            steps.splice(index, 1);

            if (index < steps.length) {

                for (let i = index; i < steps.length; i++) {
                    steps[i].position--
                }
            }

            commit('setSteps', steps)
            dispatch('calculateSteps')
            resolve()
        })
    },
    updateCurrentStep({ dispatch, getters, commit }, { source, flags, regex, replaceValue }) {
        return new Promise((resolve, reject) => {
            let steps = [].concat(getters['steps']);

            let step = steps.find(x => x.id == getters['currentStep'].id);

            step.source = source != null ? source : step.source
            step.flags = flags != null ? flags : step.flags
            step.regex = regex != null ? regex : step.regex
            step.replaceValue = replaceValue != null ? replaceValue : step.replaceValue

            commit('setSteps', steps)
            dispatch('calculateSteps')
            resolve()
        })
    }
};
export const getters = {
    currentStep: state => {
        let stepId = state.currentStep
        /**@type Array */
        let steps = state.steps
        return steps.find(x => x.id == stepId)
    },
    previousStep: (state, getters) => {
        let previousPosition = getters['currentStep'].position - 1

        return state.steps.find(x => x.position == previousPosition)

    },
    steps: state => state.steps,
    stepCount: state => state.steps.length,
    getStep: (state) => (id) => {
        return state.steps.find(x => x.id == id)
    }
};