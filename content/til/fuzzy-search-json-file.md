---
title: "Fuzzy search Json Files"
date: "2021-03-24T10:09:03"
description: "How to use fzf and jq to fuzzy search a json file"
draft: false
# image: /path/to/image
---

## Problem

You have a json file which contains an array of objects, and you want to filter objects which contain some specific data.
For example, in my case I wanted to find values which are associated with heart conditions.

```json
[{"index":0,"uids":[4723,4724,13338,40309,51486],"synonyms":["blood pressure high","diastolic hypertension","elevated blood pressure","essential hypertension","high blood pressure","htn","hypertension","malignant hypertension","pulmonary hypertension","systemic hypertension"],"common_name":"hypertension","ignore":false,"umls_cuis":["C0020538","C0020540","C0085580","C0221154","C0235222"],"cond_id":"C0020538,C0020540,C0085580,C0221154,C0235222"},{"index":1,"uids":[2688],"synonyms":["DM","diabetes","diabetes mellitus"],"common_name":"diabetes mellitus","ignore":false,"umls_cuis":["C0011849"],"cond_id":"C0011849"},{"index":2,"uids":[2691],"synonyms":["DM2","adult onset diabetes","adult onset diabetes mellitus","aodm","diabetes mellitus ii","diabetes mellitus type 2","diabetes mellitus type ii","diabetes type 2","diabetes type ii","dmii","niddm","non-insulin dependent diabetes","non-insulin dependent diabetes mellitus","non-insulin-dependent diabetes","non-insulin-dependent diabetes mellitus","noninsulin-dependent diabetes mellitus","t2dm","type 2 diabetes","type 2 diabetes mellitus","type ii diabetes","type ii diabetes mellitus"],"common_name":"type 2 diabetes","ignore":false,"umls_cuis":["C0011860"],"cond_id":"C0011860"},{"index":3,"uids":[2689,84939],"synonyms":["brittle diabetes","brittle diabetes mellitus","diabetes brittle","diabetes mellitus insulin dependent","diabetes mellitus type 1","diabetes mellitus type i","diabetes type 1","diabetes type i","iddm","iddm1","insulin dependent diabetes","insulin dependent diabetes mellitus","insulin-dependent diabetes","insulin-dependent diabetes mellitus","juvenile onset diabetes","labile diabetes","t1dm","type 1 diabetes","type 1 diabetes mellitus","type i diabetes","type i diabetes mellitus"],"common_name":"type 1 diabetes","ignore":false,"umls_cuis":["C0011854","C0342302"],"cond_id":"C0011854,C0342302"},{"index":5,"uids":[2302,2304,52655,307633],"synonyms":["CAD","cardiac ischemia","coronary arteriosclerosis","coronary artery disease","coronary disease","coronary heart disease","coronary stenosis","myocardial ischemia"],"common_name":"coronary artery disease","ignore":false,"umls_cuis":["C0010054","C0010068","C0242231","C1956346"],"cond_id":"C0010054,C0010068,C0242231,C1956346"},{"index":6,"uids":[13484],"synonyms":["depression symptoms","depressive symptoms","symptoms of depression"],"common_name":"depressive symptoms","ignore":false,"umls_cuis":["C0086132"],"cond_id":"C0086132"},{"index":7,"uids":[2627,2632,192635],"synonyms":["chronic depression","depression","depression chronic","depressions","depressive disorder","depressive illness"],"common_name":"depression","ignore":false,"umls_cuis":["C0011570","C0011581","C0581391"],"cond_id":"C0011570,C0011581,C0581391"},{"index":8,"uids":[198228,245438],"synonyms":["major depression","major depressive disorder","severe depression"],"common_name":"severe depression","ignore":false,"umls_cuis":["C0588008","C1269683"],"cond_id":"C0588008,C1269683"},{"index":9,"uids":[82279],"synonyms":["anxiety depression","anxiety/depression","depression anxiety"],"common_name":"anxiety/depression","ignore":false,"umls_cuis":["C0338908"],"cond_id":"C0338908"},{"index":10,"uids":[38],"synonyms":["abdominal cramp","abdominal cramping","abdominal cramps","crampy abdominal pain"],"common_name":"abdominal cramping","ignore":false,"umls_cuis":["C0000729"],"cond_id":"C0000729"}]

```

It's hard to `ctrl-f` through this and you really want to get the entire objects that match a fuzzy search.

## Solution

```sh
cat YOUR_FILE | jq -c '.[]' | fzf -m
```

`jq -c` minimizes the ouptuput, `.[]` splits the array into separate results so you have one line per nested object, and `fzf -m` opens fzf on the output and fuzzy searches lines with the ability to select multiple matches.
You can select a line with `tab` and exit to see all the lines on stdout with `enter`.
