import moment from "moment";

const POST_CHARACTER_LIMIT = 250;
const POST_LINE_LIMIT = 3;

export const formatPostTime = (postDate: string) => {
    const now = moment();
    const postMoment = moment(parseInt(postDate));
    const minutesDiff = now.diff(postMoment, "minutes");
    const hoursDiff = now.diff(postMoment, "hours");
    const yearsDiff = now.diff(postMoment, "years");

    if (minutesDiff < 60) {
        return `${minutesDiff || 1}m`;
    } else if (hoursDiff < 24) {
        return `${hoursDiff}h`;
    } else if (yearsDiff < 1) {
        return postMoment.format("MMM D");
    } else {
        return postMoment.format("MMM D, YYYY");
    }
};

export const shouldShortenText = (text: string): boolean => {
    const isLongText = text.length > POST_CHARACTER_LIMIT;
    const isMultiline = text.split("\n").length > POST_LINE_LIMIT;

    return isLongText || isMultiline;
};

export const shortenText = (text: string): string => {
    const lines = text.split("\n");

    if (lines.length > POST_LINE_LIMIT) {
        return lines.slice(0, POST_LINE_LIMIT).join("\n");
    }

    if (text.length > POST_CHARACTER_LIMIT) {
        return text.slice(0, POST_CHARACTER_LIMIT);
    }

    return text;
};
