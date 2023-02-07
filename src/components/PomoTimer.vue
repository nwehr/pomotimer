<template>
    <div id="timer">
        <div class="numbers">{{ minutesAndSeconds }}</div>
        <div class="buttons" v-show="timeLeft > 0">
            <button class="btn danger" @click="stopTimer">Stop</button>
        </div>
        <div class="buttons" v-show="timeLeft === 0">
            <button class="btn primary" @click="startTimer(20 * 60)">20:00</button>
            <button class="btn success" @click="startTimer(5 * 60)">05:00</button>
        </div>
    </div>
    <p><a href="https://github.com/nwehr/pomotimer">github.com/nwehr/pomotimer</a></p>
    <p>&copy; Nathan Wehr</p>
</template>

<script>
export default {
    data() {
        return {
            timeLeft: 0
            , endTime: 0
            , interval: null
            , audio: new Audio('/assets/mixkit-score-casino-counter-1998.wav')
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
                    self.audio.loop = false
                    self.audio.play()
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
     
    p {
        color: rgb(96, 149, 195);
        margin: 0 0 .5em 0;
        font-weight: lighter;
        font-size: 10pt;
    }
    
    a {
        color: rgb(96, 149, 195);
    }

    #timer {
        width: 248px;
        margin: 2em auto 1em auto;
        padding: 1em 2em 1.5em 2em;
        background: #193549;
        border-radius: .45em;
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

    button.btn {
        border: none;
        border-radius: .25em;
        font-size: 16pt;
        width: 100%;
        margin: .25em;
        line-height: 2em;
    }

    button.btn.success {
        background: #63d186;
        color: white;
    }

    button.btn.success:active {
        background: #4da368;
    }

    button.btn.primary {
        background: #50a6db;
        color: white;
    }

    button.btn.primary:active {
        background: #4084af;
    }

    button.btn.danger {
        background: #eb3a62;
        color: white;
    }

    button.btn.danger:active {
        background: #be2e50;
    }

    button:active {
        background: #4e748d;
    }

    button:disabled {
        background: #334e60;
        color: rgb(170, 170, 170);
    }
</style>