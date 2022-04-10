import React from 'react';

function SwalAlert(props) {
    return (
        Swal.fire({
            title: 'Are you sure?',
            text: `delete meeting: ${props.meetings}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    );
}

export default SwalAlert;