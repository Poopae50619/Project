import Api from '@/services/Api'

export default {
    index(search) {
        return Api().get('Bookborrow')
    },
    show(userId) {
        return Api().get('Bookborrow/' + userId)
    },
    post(Bookborrow) {
        return Api().post('Bookborrow', Bookborrow)
    },
    put(Bookborrow) {
        return Api().put('Bookborrow/' + Bookborrow.id, Bookborrow)
    },
    delete(Bookborrow) {
        return Api().delete('Bookborrowr/' + Bookborrow.id, Bookborrowr)
    },
    getFront() {
        return Api().get('users/front')
    }
}