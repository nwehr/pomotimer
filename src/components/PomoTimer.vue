<template>
    <div id="timer">
        <div class="numbers">{{ minutesAndSeconds }}</div>
        <div class="buttons">
            <button @click="stopTimer" :disabled="timeLeft === 0">Stop</button>
            <button @click="startTimer(20 * 60)">20:00</button>
            <button @click="startTimer(5 * 60)">05:00</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            timeLeft: 0
            , endTime: 0
            , interval: null
        }
    }
    , methods: {
        startTimer(seconds) {
            const self = this
            window.clearInterval(self.interval)
            self.endTime = (new Date()).getTime() + (seconds * 1000)

            self.interval = window.setInterval(function () {
                self.timeLeft = Math.ceil((self.endTime - (new Date()).getTime()) / 1000)

                if (self.timeLeft <= 0) {
                    self.timeLeft = 0
                    window.clearInterval(self.interval)

                    const audio = new Audio('/assets/mixkit-score-casino-counter-1998.wav')
                    audio.loop = false
                    audio.play()
                }
            }, 10)
        },
        stopTimer() {
            this.timeLeft = 0
            window.clearInterval(this.interval)
        }
    }
    , computed: {
        minutesAndSeconds() {
            const minutes = Math.floor(this.timeLeft / 60)
            const seconds = this.timeLeft % 60

            const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`
            const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`

            document.title = `${minutesStr}:${secondsStr}`

            return `${minutesStr}:${secondsStr}`
        }
    }
}
</script>

<style>
    body {
        background: #122738;
    }

    #timer {
        width: 248px;
        margin: 2em auto;
        padding: 1em 2em 1.5em 2em;
        background: #193549;
        border-radius: .25em;
        color: white;
    }

    .numbers {
        font-size: 64pt;
    }

    .buttons {
        margin-top: 0.5em;
        display: flex;
        justify-content: space-evenly;
    }

    button {
        background: #7baed0;
        border: none;
        border-radius: .25em;
        padding: .25em .5em;
        font-size: 16pt;
        color: white;
    }

    button:active {
        background: #4e748d;
    }

    button:disabled {
        background: #334e60;
        color: rgb(170, 170, 170);
    }
</style>