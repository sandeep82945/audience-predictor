# -*- coding: utf-8 -*-

from nltk.tag import StanfordNERTagger
from nltk.tokenize import word_tokenize
from read_data import read_sentence


st = StanfordNERTagger('../../stanford-ner/classifiers/english.all.3class.distsim.crf.ser.gz','../../stanford-ner/stanford-ner.jar',encoding='utf-8')

text = read_sentence()


tokenized_text = word_tokenize(text)
classified_text = st.tag(tokenized_text)
print classified_text

result=[]

for a,b in classified_text:
	if(b=='LOCATION'):
		result.append(a[0:])
	
print('\n')
print(result)

