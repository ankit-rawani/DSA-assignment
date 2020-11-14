function Merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return resultArray
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
}

function MergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let middle = Math.floor(arr.length/2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);

    return Merge(MergeSort(left), MergeSort(right));

}

function removeDuplicates(arr) {
    let sorted_arr = MergeSort(arr);
	let res = [];
	let i = 0;
	while (i < sorted_arr.length-1) {
		if(sorted_arr[i] != sorted_arr[i+1]) {
			res.push(sorted_arr[i]);
		}
		i++;
	}
	
	res.push(sorted_arr[i]);

	return res;
}

function timeComplexity(arr) {
	let t0 = performance.now();
	removeDuplicates(arr);
	let t1 = performance.now();
	return t1-t0;
}

const input = document.querySelector('#input');
const result = document.querySelector('#result');
const h6 = document.querySelector('h6');
input.onkeyup = processInput;

function processInput(e) {
     console.log(e);
    if(e.key == "Enter"){
        if (!input.value.trim()) M.toast({html:"Invalid Input!", displayLength:1000})
        else {
            let arr = input.value.trim().split(' ');
            let int_arr = [];
			console.log(arr);
			for(let i = 0; i < arr.length; i++) {
				if(!Number(arr[i])) {
					if(isNaN(Number(arr[i]))) {
						M.toast({html:`${arr[i]} is not a number`, displayLength:1000});
						break;
					}
					M.toast({html:"You've given some extra spaces, please give only one space after each element.", displayLength:1000});
					break;
				}
				else {
					int_arr.push(Number(arr[i]));
				}
			}
            h6.textContent = "Modified array";
			result.textContent = removeDuplicates(int_arr).join(', ');   
			console.log(timeComplexity(int_arr)); //check console
        }
    }

    if (e.key == "Backspace") {
        result.textContent = "";
        h6.textContent = "";
    }

}