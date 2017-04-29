# -*- coding: utf-8 -*-

from nltk.tag import StanfordNERTagger
from nltk.tokenize import word_tokenize

st = StanfordNERTagger('/home/sandeep/Documents/stanford-ner/classifiers/english.all.3class.distsim.crf.ser.gz','/home/sandeep/Documents/stanford-ner/stanford-ner.jar',encoding='utf-8')

text = 'While in bhagwanpur, Christine Lagarde discussed short-term stimulus efforts in a recent interview with the Wall Street Journal.'

tokenized_text = word_tokenize(text)
classified_text = st.tag(tokenized_text)

print(classified_text)


