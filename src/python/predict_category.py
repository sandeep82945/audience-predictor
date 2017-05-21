from sklearn.neighbors import KNeighborsClassifier
knn=KNeighborsClassifier(n_neighbors=1)
from sklearn.feature_extraction.text import CountVectorizer
from read_data import read_sentence
from read_data import convert
import numpy as np
from categories import tsv_labels
labels = tsv_labels['categories']["ids"]
categories = tsv_labels['categories']["names"]
#for reading file
import pandas as pd
sms = pd.read_table('data/pk.tsv', header=None, names=['label', 'message'])
#Randomising the rows in the file
sms = sms.reindex(np.random.permutation(sms.index))


# examine the first 10 rows
#print(sms.head(10))



# convert label to a numerical variable
sms['label_num'] = sms.label.map(labels)



# check that the conversion worked
#print(sms.head(10))


X_train = sms.message
y_train = sms.label_num


# instantiate the vectorizer			//we can use tf-idf or feature extracter instead
vect = CountVectorizer()



# learn training data vocabulary(fit), then use it to create a document-term matrix(transform)
vect.fit(X_train)
X_train_dtm = vect.transform(X_train)



#lean using knn
knn.fit(X_train_dtm,y_train)


#vectorizing input
text = read_sentence()
simple_test=[text]

# transform testing data (using fitted vocabulary) into a document-term matrix
simple_test_dtm=vect.transform(simple_test)



y_pred_class = knn.predict(simple_test_dtm)


print convert([categories[y_pred_class[0]]])

//Json-javascript 



