const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likeSum = 0
    for (const entry of blogs) {
        likeSum += entry.likes
    }
    return likeSum
}

module.exports = {
    dummy, totalLikes
}