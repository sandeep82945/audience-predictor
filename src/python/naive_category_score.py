from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split  
from sklearn import metrics
from sklearn.metrics import precision_score
from sklearn.metrics import recall_score
import numpy as np
from normalize_score import normalize, normalize_fs  

#for reading file
import pandas as pd
sms = pd.read_table('data/pk.tsv', header=None, names=['label', 'message'])

#Randomising the rows in the file
sms = sms.reindex(np.random.permutation(sms.index))
from sklearn.feature_extraction.text import TfidfVectorizer

from categories import tsv_labels
labels = tsv_labels['categories']["ids"]
categories = tsv_labels['categories']["names"]

sms['label_num'] = sms.label.map(labels)

 #check that the conversion worked
#print(sms.tail(10))

X_train = sms.message
y_train = sms.label_num

X_train, X_test, y_train, y_test = train_test_split(sms.message, sms.label_num,test_size=0.33, random_state=42)

vect = CountVectorizer(ngram_range=(1, 2))
#vect = TfidfVectorizer(ngram_range=(1, 2))
vect.fit(X_train)
X_train_dtm = vect.transform(X_train)
#print X_train_dtm
from sklearn.naive_bayes import MultinomialNB

nb=MultinomialNB()

#print X_train_dtm
#print "Y train ========"
#print y_train
nb.fit(X_train_dtm,y_train)



simple_test_dtm=vect.transform(X_test)

y_pred_class = nb.predict(simple_test_dtm)



#accurcy score
accuracy=metrics.accuracy_score(y_test, y_pred_class)
print "acuuracy=",normalize(accuracy)
precision=precision_score(y_test, y_pred_class, average='macro')
#print "precision=",precision

recall=recall_score(y_test, y_pred_class, average='macro') 
#print "recall=",recall

F1 = 2 * (precision * recall) / (precision + recall)

print "f-score=",normalize_fs(F1)

#print metrics.classification_report(y_test, y_pred_class)










