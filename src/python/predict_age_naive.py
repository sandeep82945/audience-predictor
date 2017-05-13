from sklearn.feature_extraction.text import CountVectorizer
from read_data import read_sentence1
from read_data import convert

#for reading file
import pandas as pd
sms = pd.read_table('./data/blogs_data.tsv', header=None, names=['label', 'message'])
categories = {'20-30':2, "30-40":3, 'not Identified':0}

# convert label to a numerical variable
sms['label_num'] = sms.label.map(categories)

#check that the conversion worked
print(sms.tail(10))

X_train = sms.message
y_train = sms.label_num


vect = CountVectorizer()
vect.fit(X_train)

X_train_dtm = vect.transform(X_train)

from sklearn.naive_bayes import MultinomialNB

nb=MultinomialNB()

nb.fit(X_train_dtm,y_train)

text = read_sentence1()

simple_test=[text]

simple_test_dtm=vect.transform(simple_test)

y_pred_class = nb.predict(simple_test_dtm)

print convert([categories[y_pred_class[0]]])