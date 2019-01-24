import { Pipe, PipeTransform } from '@angular/core';

/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'textDrop' })
export class TextDropPipe implements PipeTransform {
    transform(text: string, length: number = 60): string {
        if (text.length > length)
            return text.substr(0, length) + '...';
        else
            return text;
    }
}