export const validateText = (input:string) =>
{
    if(input) return true;
    if(input.length > 2) return true;

    return false;
}

export const validateTextLength = (input:string, maxLength:number) =>
{
    if(input.length <= maxLength) return true;
    return false;
}

export const validateTextAreaLines = (lines:number, maxLines:number) =>
{
    if(lines <= maxLines) return true;
    return false;
}


export const validateFileSize = (file:any, maxSize:number) =>
{
    console.log(maxSize);
    console.log(file.size);
    
    if(file.size <= maxSize) return true;
    return false;
}