const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;

function containsLink(text) {
    return urlRegex.test(text);
}

module.exports = { containsLink };