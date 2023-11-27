### Summary

---

### Leadership Principles

**Question**

Tell me about a time when you strongly disagreed with your manager or peer on something you considered very important to the business.
- What was it and how did you handle it?
- Knowing what you know now, would you do anything differently?

**Response**

*Scenario*

*Action*

---

### Technical
**Question**

Given a dictionary of words and single string of letters, find all possible sentences that can be constructed from the input.

```python
dictionary={"the", "tea", "is", "hot"}
wordBreak("theteaishot", dictionary) = ["the tea is hot"]

dictionary={"i", "have", "a", "lap", "top", "laptop"}
wordBreak("ihavealaptop", dictionary) = ["i have a lap top", "i have a laptop"]
```

**Response**

| Analysis | Pros | Cons |
| --- | ---  | ---- |
| Did candidate ask clarifying questions? |      | |
| Did get base case working of splitting word without branches `teaishot` ? |      |    |
| Did get complex case working of splitting word with branches `havelaptop` ? |      |   |
| Did the candidate determine runtime of naive solution |      |     |
| Did the candidate determine runtime of complex solution |      |    |

**Code**

```java
public List<String> wordBreak(String input, Set<String> dictionary) {
   // Candidate code
}
```
