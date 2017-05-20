from sklearn.feature_extraction.text import CountVectorizer
from read_data import read_sentence
from read_data import convert

#for reading file
import pandas as pd
sms = pd.read_table('data/pk.tsv', header=None, names=['label', 'message'])

from categories import tsv_labels
labels = tsv_labels['categories']["ids"]
categories = tsv_labels['categories']["names"]

#print dict(labels)
#print dict(categories)
# convert label to a numerical variable
sms['label_num'] = sms.label.map(labels)

 #check that the conversion worked
#print(sms.tail(10))

X_train = sms.message
y_train = sms.label_num


vect = CountVectorizer()
vect.fit(X_train)

X_train_dtm = vect.transform(X_train)

from sklearn.naive_bayes import MultinomialNB

nb=MultinomialNB()

#print X_train_dtm
#print "Y train ========"
#print y_train
nb.fit(X_train_dtm,y_train)

text = read_sentence()

simple_test=[text]

simple_test_dtm=vect.transform(simple_test)

y_pred_class = nb.predict(simple_test_dtm)

print convert([categories[y_pred_class[0]]])



















