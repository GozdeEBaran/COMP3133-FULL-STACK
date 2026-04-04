import { Component } from '@angular/core';

@Component({
  selector: 'app-students',
  standalone: false,
  template: `
    <div class="students-container">
      <h2>Students List</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Program</th>
            <th>GPA</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let student of students">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.program }}</td>
            <td>{{ student.gpa }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .students-container {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    h2 {
      color: #333;
      margin-bottom: 16px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 10px 14px;
      text-align: left;
    }
    th {
      background-color: #4a90e2;
      color: white;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
  `]
})
export class StudentsComponent {
  students = [
    { id: 101515982, name: 'Hazel',  program: 'Full Stack Development', gpa: 3.9 },
    { id: 101515983, name: 'Cihat',  program: 'Computer Science',       gpa: 3.7 },
    { id: 101515984, name: 'Irem',   program: 'Software Engineering',   gpa: 3.5 },
    { id: 101515985, name: 'Golden', program: 'Data Science',           gpa: 3.8 },
  ];
}
