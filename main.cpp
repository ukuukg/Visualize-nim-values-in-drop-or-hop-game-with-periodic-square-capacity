#include<fstream>
#include<iostream>
#include<vector>
using namespace std;

int process(){
    return 0;
}

int process(int a){
    if(a==0)
        return 1;
    return 0;
}

int process(int a, int b){
    if((a!=0)&&(b!=0))
        return 0;
    if((a!=1)&&(b!=1))
        return 1;
    return 2;
}

int process(int a, int b, int c){
    if((a!=0)&&(b!=0)&&(c!=0))
        return 0;
    if((a!=1)&&(b!=1)&&(c!=1))
        return 1;
    if((a!=2)&&(b!=2)&&(c!=2))
        return 2;
    return 3;
}

int main(int argc, char* argv[]){
    ofstream ofs("output.txt");
    if(argc!=4){
        ofs<<"error\n";
        return 1;
    }
    int x=stoi(argv[1]), y=stoi(argv[2]), length=stoi(argv[3]), x_process, y_process;
    
    int nim_table[(length/2+length%2)*x+1][(length/2)*y+1];
    int x_upper=(length/2+length%2)*x;
    int y_upper=(length/2)*y;
    nim_table[0][0]=0;

    vector<pair<int,int> >order;
    pair<int,int>current={0,0};
    for(int i=0;i<length;i++){
        if(i%2==0){
            for(int j=0;j<x;j++){
                current.first++;
                order.push_back(current);
            }
        }else{
            for(int j=0;j<y;j++){
                current.second++;
                order.push_back(current);
            }
        }
    }

    for(auto k:order){
        x_process=k.first; 
        y_process=k.second;
        if(x_process==0){
            nim_table[x_process][y_process]=process(nim_table[x_process][y_process-1]);
        }else if(y_process==0){
            nim_table[x_process][y_process]=process(nim_table[x_process-1][y_process]);
        }else{
            nim_table[x_process][y_process]=process(nim_table[x_process][y_process-1],nim_table[x_process-1][y_process]);
        }

        while(1){
            y_process++;
            x_process--;
            if(x_process>x_upper||y_process>y_upper)
                break;
            if(x_process==0){
                nim_table[x_process][y_process]=process(nim_table[x_process][y_process-1],nim_table[x_process+1][y_process-1]);
                break;
            }else{
                nim_table[x_process][y_process]=process(nim_table[x_process][y_process-1],nim_table[x_process-1][y_process],nim_table[x_process+1][y_process-1]);
            }
        }

        x_process=k.first; 
        y_process=k.second;

        while(1){
            y_process--;
            x_process++;
            if(x_process>x_upper||y_process>y_upper)
                break;
            if(y_process==0){
                nim_table[x_process][y_process]=process(nim_table[x_process-1][y_process],nim_table[x_process-1][y_process+1]);
                break;
            }else{
                nim_table[x_process][y_process]=process(nim_table[x_process][y_process-1],nim_table[x_process-1][y_process],nim_table[x_process-1][y_process+1]);
            }
        }
    }
    for(int i=0;i<=x_upper;i++){
        for(int j=0;j<=y_upper;j++){
            ofs<<nim_table[i][j];
        }
        ofs<<"T";
    }
}