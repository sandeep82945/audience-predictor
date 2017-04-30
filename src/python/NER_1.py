# -*- coding: utf-8 -*-

from nltk.tag import StanfordNERTagger
from nltk.tokenize import word_tokenize

st = StanfordNERTagger('/home/mayank/MyFolder/stanford-ner/classifiers/english.all.3class.distsim.crf.ser.gz','/home/mayank/MyFolder/stanford-ner/stanford-ner.jar',encoding='utf-8')

text = 'While in France, Christine Lagarde discussed short-term stimulus efforts in a recent interview with the Wall Street Journal. I went to China.'

tokenized_text = word_tokenize(text)
classified_text = st.tag(tokenized_text)

print(classified_text)

result=[]

for a,b in classified_text:
	if(b=='LOCATION'):
		result.append(a[1:])
	
print('\n')
print(result)

