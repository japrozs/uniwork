import moment from "moment";

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
