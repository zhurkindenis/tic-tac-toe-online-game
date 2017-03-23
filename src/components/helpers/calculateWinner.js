export default function calculateWinner(array){
    if (array[0]=='firstPlayer' && array[1]=='firstPlayer' && array[2]=='firstPlayer' ||
        array[3]=='firstPlayer' && array[4]=='firstPlayer' && array[5]=='firstPlayer' ||
        array[6]=='firstPlayer' && array[7]=='firstPlayer' && array[8]=='firstPlayer' ||
        array[0]=='firstPlayer' && array[3]=='firstPlayer' && array[6]=='firstPlayer' ||
        array[1]=='firstPlayer' && array[4]=='firstPlayer' && array[7]=='firstPlayer' ||
        array[2]=='firstPlayer' && array[5]=='firstPlayer' && array[8]=='firstPlayer' ||
        array[0]=='firstPlayer' && array[4]=='firstPlayer' && array[8]=='firstPlayer' ||
        array[2]=='firstPlayer' && array[4]=='firstPlayer' && array[6]=='firstPlayer')
        return 'Победил игрок номер один!';
    if (array[0]=='secondPlayer' && array[1]=='secondPlayer' && array[2]=='secondPlayer' ||
        array[3]=='secondPlayer' && array[4]=='secondPlayer' && array[5]=='secondPlayer' ||
        array[6]=='secondPlayer' && array[7]=='secondPlayer' && array[8]=='secondPlayer' ||
        array[0]=='secondPlayer' && array[3]=='secondPlayer' && array[6]=='secondPlayer' ||
        array[1]=='secondPlayer' && array[4]=='secondPlayer' && array[7]=='secondPlayer' ||
        array[2]=='secondPlayer' && array[5]=='secondPlayer' && array[8]=='secondPlayer' ||
        array[2]=='secondPlayer' && array[5]=='secondPlayer' && array[8]=='secondPlayer' ||
        array[2]=='secondPlayer' && array[4]=='secondPlayer' && array[6]=='secondPlayer')
        return 'Победил игрок номер два!';
    //Если все ходы выполнены и победитель не выявлен, то ничья
    if  (array[0] && array[1] && array[2] && array[3] && array[4] && array[5]
        && array[6] && array[7] && array[8]) return "Ничья!";
}