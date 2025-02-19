import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../interfaces'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
    providedIn: "root"
})

export class PositionsService{
    constructor(private http: HttpClient){
    }

    fetch(categoryId: string): Observable<Position[]>{
        return this.http.get<Position[]>(`/api/positon/${categoryId}`)
    }

    create(position: Position): Observable<Position>{
        return this.http.post<Position>('/api/position', position)
    }

    update(position: Position): Observable<Position>{
        return this.http.patch<Position>(`/api/position/${position._id}`, position)
    }

    delete(position: Position): Observable<Message>{
        return this.http.delete<Message>(`/api/position/${position._id}`)
    }
}