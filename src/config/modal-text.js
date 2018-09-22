const modalText = {
    reproductionSteps: {
        title: `#### Adding Reproduction Steps`,
        message: `
To start off, describe what it is you are trying to accomplish with Quasar.
Then list off the minimal steps you took to reach the error.
Note: You can use markdown to format lists and code.
You can also paste a link to add a screenshot or drag and drop the image later in Github.
        `
    },
    expected: {
        title: `#### Adding the Expected Results`,
        message: `
Explain what you were expecting in some detail. 
Please don't write generic phrases like 'It should work'.
Write EXACTLY what you think should happen.
        `
    },
    actual: {
        title: `#### Adding What Actually Happened`,
        message: `
Write what happened as detailed, but as succinctly as possible.
Please don't write generic phrases like 'It doesn't work'!
Write EXACTLY what happened. Be sure to add stack traces or error messages. 
        `
    },
    api: {
        title: `#### Adding an API/ Usage Example`,
        message: `
Try to formulate how the new feature would be used in code by a developer.
If you can't put it into some type of code format, you probably haven't though about the idea enough.
        `
    },
    problem: {
        title: `#### Adding the Reason for the Feature`,
        message: `
Try to answer one or more of these questions as best and as succinctly as possible.
What value does this feature add to your project?
What will it allow you to do that you can't do today?
How will it make current workarounds straightforward?
What potential bugs and edge cases does it help to avoid?
        `
    },
    previeErrorText: {
        title: `#### Oops! Aren't you missing something?`,
        message: `
Please fill in all mandatory fields. Doing so will help us to help you!
The fields missing input should be red now. 
        `
    }
}

export { modalText }