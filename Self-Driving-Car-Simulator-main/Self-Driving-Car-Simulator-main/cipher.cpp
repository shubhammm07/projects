#include<bits/stdc++.h>
using namespace std;
int main()
{
unordered_map<char,int> map;
for(int i=0;i<26;i++)
map[char(97+i)]=i;
string plaintext;
int n;
int k;
cout<<"\n Enter Plaintext: ";
cin>>plaintext;
cout<<"\n Enter key value: ";
cin>>k;
string cipher;
for(int i=0;i<plaintext.size();i++)
{
int C=(map[plaintext[i]]+k)%26;
cipher+=char(C+97);
}
cout<<"\n Ciphertext: "<<cipher;
return(0);
}