import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({
    data: () => {
        return {
            showBooks: true,
            books: [
                {
                    title: "The Decline and Fall of the Roman Empire"
                    , author: "Edward Gibbon"
                    , isFav: true
                }
                , {
                    title: "The Constitution of Liberty"
                    , author: "F.A. Hayak"
                    , isFav: true
                }
                , {
                    title: "Clean Code"
                    , author: "Martin Fowler"
                    , isFav: false
                }
            ]
        }
    }, 
    methods: {
        toggleShowBooks() {
            this.showBooks = !this.showBooks
        },

        toggleFav(_, index) {
            this.books[index].isFav = !this.books[index].isFav
        }
    }
})

app.mount('#app')