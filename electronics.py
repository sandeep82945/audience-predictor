import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
#url = 'https://raw.githubusercontent.com/justmarkham/pydata-dc-2016-tutorial/master/sms.tsv'
#read file into pandas from the working directory

sms = pd.read_table('sms.tsv', header=None, names=['label', 'message'])

# alternative: read file into pandas from a URL
#sms = pd.read_table(url, header=None, names=['label', 'message'])

# examine the shape
print(sms.shape)

# examine the first 10 rows
print(sms.head(10))


# examine the class distribution
print(sms.label.value_counts())

# convert label to a numerical variable
sms['label_num'] = sms.label.map({'nonelec':0, 'ELECTRONICS':1})


# check that the conversion worked
print(sms.head(10))



# how to define X and y (from the iris data) for use with a MODEL
# X = iris.data
# y = iris.target
# print(X.shape)
# print(y.shape)


# how to define X and y (from the SMS data) for use with COUNTVECTORIZER
X = sms.message
y = sms.label_num
print(X.shape)
print(y.shape)



# split X and y into training and testing sets
from sklearn.cross_validation import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=1)
print(X_train.shape)
print(X_test.shape)
print(y_train.shape)
print(y_test.shape)


# instantiate the vectorizer			//we can use tf-idf or feature extracter instead
vect = CountVectorizer()


# learn training data vocabulary(fit), then use it to create a document-term matrix(transform)
vect.fit(X_train)
X_train_dtm = vect.transform(X_train)



# equivalently: combine fit and transform into a single step
#X_train_dtm = vect.fit_transform(X_train)


# examine the document-term matrix
print("\n document-term  of training matrix sparse matric of 4179x7456 where 7456 is the number of features\n")
print(X_train_dtm)



# transform testing data (using fitted vocabulary) into a document-term matrix
X_test_dtm = vect.transform(X_test)
#no fit because we used the vocabulatory created in the training will same be used for testing
print("\n document-term  of testing matrix dtm of same size of as train \n")
print(X_test_dtm)




# import and instantiate a Multinomial Naive Bayes model
from sklearn.naive_bayes import MultinomialNB
nb = MultinomialNB()


# train the model using X_train_dtm
nb.fit(X_train_dtm, y_train)


# make class predictions for X_test_dtm
y_pred_class = nb.predict(X_test_dtm)




# calculate accuracy of class predictions
from sklearn import metrics
print(metrics.accuracy_score(y_test, y_pred_class))





















