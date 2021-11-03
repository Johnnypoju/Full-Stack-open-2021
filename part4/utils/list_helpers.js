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

const favoriteBlog = (blogs) => {
    let highestLikes = 0
    let favoriteEntry = {}
    for (const entry of blogs) {
        if (entry.likes > highestLikes){
            highestLikes = entry.likes
            favoriteEntry = entry
        }
    }
    return favoriteEntry
 }

module.exports = {
    dummy, totalLikes, favoriteBlog
}