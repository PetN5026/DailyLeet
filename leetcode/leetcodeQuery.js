export const questionDetail = `
query questionDetail($titleSlug: String!) {
languageList {
  id
  name
}
submittableLanguageList {
  id
  name
  verboseName
}
statusList {
  id
  name
}
questionDiscussionTopic(questionSlug: $titleSlug) {
  id
  commentCount
  topLevelCommentCount
}
ugcArticleOfficialSolutionArticle(questionSlug: $titleSlug) {
  uuid
  chargeType
  canSee
  hasVideoArticle
}
question(titleSlug: $titleSlug) {
  title
  titleSlug
  questionId
  questionFrontendId
  questionTitle
  translatedTitle
  content
  translatedContent
  categoryTitle
  difficulty
  stats
  companyTagStatsV2
topicTags {
    name
    slug
    translatedName
  }
  likes
  dislikes
  hints
  exampleTestcaseList
}
}
`;
export const DAILY_CODING_CHALLENGE_QUERY = `
query questionOfToday {
	activeDailyCodingChallengeQuestion {
		date
		userStatus
		link
		question {
			acRate
			difficulty
			freqBar
			frontendQuestionId: questionFrontendId
			isFavor
			paidOnly: isPaidOnly
			status
			title
			titleSlug
			hasVideoSolution
			hasSolution
			topicTags {
				name
				id
				slug
			}
		}
	}
}`;
const problemSet = `
query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
problemsetQuestionList: questionList(
categorySlug: $categorySlug
limit: $limit
skip: $skip
filters: $filters
) {
total: totalNum
questions: data {
  acRate
  difficulty
  freqBar
  frontendQuestionId: questionFrontendId
isFavor
  paidOnly: isPaidOnly
  status
  title
  titleSlug
  topicTags {
    name
    id
    slug
  }
  hasSolution
  hasVideoSolution
}
}
}

`;
