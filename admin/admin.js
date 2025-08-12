        // Dados dos agendamentos (simulando um banco de dados)
        let appointments = [
            {
                id: 1,
                clientName: "Maria Silva",
                clientPhone: "(11) 99999-9999",
                clientEmail: "maria@email.com",
                serviceType: "closet",
                date: "2024-11-08",
                time: "09:00",
                address: "Rua das Flores, 123",
                observations: "Cliente quer organizar closet de casal",
                status: "agendado"
            },
            {
                id: 2,
                clientName: "João Santos",
                clientPhone: "(11) 88888-8888",
                clientEmail: "joao@email.com",
                serviceType: "office",
                date: "2024-11-08",
                time: "14:00",
                address: "Av. Paulista, 456",
                observations: "Home office pequeno",
                status: "agendado"
            },
            {
                id: 3,
                clientName: "Ana Costa",
                clientPhone: "(11) 77777-7777",
                clientEmail: "ana@email.com",
                serviceType: "kitchen",
                date: "2024-11-08",
                time: "16:30",
                address: "Rua dos Pinheiros, 789",
                observations: "Cozinha grande, muito desorganizada",
                status: "agendado"
            }
        ];

        let currentDate = new Date();
        let editingAppointment = null;

        // Inicializar calendário
        function initCalendar() {
            updateCalendar();
            updateStats();
        }

        // Atualizar calendário
        function updateCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            // Atualizar título do mês
            const monthNames = [
                "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
            ];
            document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
            
            // Limpar grid do calendário
            const calendarGrid = document.getElementById('calendarGrid');
            calendarGrid.innerHTML = '';
            
            // Primeiro dia do mês e quantos dias tem
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            const startingDayOfWeek = firstDay.getDay();
            
            // Adicionar dias vazios do mês anterior
            for (let i = 0; i < startingDayOfWeek; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.classList.add('calendar-day', 'empty');
                calendarGrid.appendChild(emptyDay);
            }
            
            // Adicionar dias do mês
            const today = new Date();
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('calendar-day');
                dayElement.textContent = day;
                
                // Verificar se é hoje
                if (year === today.getFullYear() && 
                    month === today.getMonth() && 
                    day === today.getDate()) {
                    dayElement.classList.add('today');
                }
                
                // Verificar se tem agendamentos
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const hasAppointment = appointments.some(app => app.date === dateStr && app.status === 'agendado');
                if (hasAppointment) {
                    dayElement.classList.add('has-appointment');
                }
                
                // Adicionar evento de clique
                dayElement.addEventListener('click', () => {
                    document.getElementById('appointmentDate').value = dateStr;
                    openModal();
                });
                
                calendarGrid.appendChild(dayElement);
            }
        }

        // Navegar meses
        function previousMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar();
        }

        function nextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendar();
        }

        // Abrir modal
        function openModal(appointmentId = null) {
            const modal = document.getElementById('appointmentModal');
            const modalTitle = document.getElementById('modalTitle');
            const form = document.getElementById('appointmentForm');
            
            if (appointmentId) {
                // Editando agendamento existente
                editingAppointment = appointments.find(app => app.id === appointmentId);
                modalTitle.textContent = 'Editar Agendamento';
                
                // Preencher formulário
                document.getElementById('clientName').value = editingAppointment.clientName;
                document.getElementById('clientPhone').value = editingAppointment.clientPhone;
                document.getElementById('clientEmail').value = editingAppointment.clientEmail;
                document.getElementById('serviceType').value = editingAppointment.serviceType;
                document.getElementById('appointmentDate').value = editingAppointment.date;
                document.getElementById('appointmentTime').value = editingAppointment.time;
                document.getElementById('clientAddress').value = editingAppointment.address;
                document.getElementById('observations').value = editingAppointment.observations;
            } else {
                // Novo agendamento
                editingAppointment = null;
                modalTitle.textContent = 'Novo Agendamento';
                form.reset();
                
                // Definir data de hoje se não houver data selecionada
                const today = new Date().toISOString().split('T')[0];
                if (!document.getElementById('appointmentDate').value) {
                    document.getElementById('appointmentDate').value = today;
                }
            }
            
            modal.style.display = 'block';
        }

        // Fechar modal
        function closeModal() {
            document.getElementById('appointmentModal').style.display = 'none';
            editingAppointment = null;
        }

        // Salvar agendamento
        document.getElementById('appointmentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const appointmentData = {
                clientName: document.getElementById('clientName').value,
                clientPhone: document.getElementById('clientPhone').value,
                clientEmail: document.getElementById('clientEmail').value,
                serviceType: document.getElementById('serviceType').value,
                date: document.getElementById('appointmentDate').value,
                time: document.getElementById('appointmentTime').value,
                address: document.getElementById('clientAddress').value,
                observations: document.getElementById('observations').value,
                status: 'agendado'
            };
            
            if (editingAppointment) {
                // Editando agendamento existente
                const index = appointments.findIndex(app => app.id === editingAppointment.id);
                appointments[index] = { ...appointmentData, id: editingAppointment.id };
                alert('Agendamento atualizado com sucesso!');
            } else {
                // Novo agendamento
                appointmentData.id = Date.now(); // ID simples baseado em timestamp
                appointments.push(appointmentData);
                alert('Agendamento criado com sucesso!');
            }
            
            closeModal();
            updateCalendar();
            updateTodayAppointments();
            updateStats();
        });

        // Editar agendamento
        function editAppointment(id) {
            openModal(id);
        }

        // Concluir agendamento
        function completeAppointment(id) {
            if (confirm('Marcar este agendamento como concluído?')) {
                const appointment = appointments.find(app => app.id === id);
                if (appointment) {
                    appointment.status = 'concluido';
                    updateTodayAppointments();
                    updateCalendar();
                    updateStats();
                    alert('Agendamento marcado como concluído!');
                }
            }
        }

        // Cancelar agendamento
        function cancelAppointment(id) {
            if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
                const index = appointments.findIndex(app => app.id === id);
                if (index > -1) {
                    appointments[index].status = 'cancelado';
                    updateTodayAppointments();
                    updateCalendar();
                    updateStats();
                    alert('Agendamento cancelado!');
                }
            }
        }

        // Atualizar agendamentos de hoje
        function updateTodayAppointments() {
            const today = new Date().toISOString().split('T')[0];
            const todayAppointments = appointments.filter(app => 
                app.date === today && app.status === 'agendado'
            );
            
            const container = document.getElementById('todayAppointments');
            container.innerHTML = '';
            
            if (todayAppointments.length === 0) {
                container.innerHTML = '<p style="text-align: center; color: var(--texto_secundario); padding: 20px;">Nenhum agendamento para hoje</p>';
                return;
            }
            
            todayAppointments.forEach(appointment => {
                const serviceNames = {
                    'closet': 'Organização de Closet',
                    'kitchen': 'Organização de Cozinha',
                    'office': 'Organização de Escritório',
                    'bedroom': 'Organização de Quarto',
                    'living': 'Organização de Sala',
                    'pantry': 'Organização de Despensa',
                    'garage': 'Organização de Garagem',
                    'moving': 'Organização para Mudança',
                    'other': 'Outro'
                };
                
                const appointmentItem = document.createElement('div');
                appointmentItem.className = 'appointment-item';
                appointmentItem.innerHTML = `
                    <div class="appointment-header">
                        <div class="appointment-time">${appointment.time}</div>
                    </div>
                    <div class="appointment-name">${appointment.clientName}</div>
                    <div class="appointment-service">${serviceNames[appointment.serviceType] || 'Outro'}</div>
                    <div class="appointment-actions">
                        <button class="action-btn-small btn-edit" onclick="editAppointment(${appointment.id})">Editar</button>
                        <button class="action-btn-small btn-complete" onclick="completeAppointment(${appointment.id})">Concluir</button>
                        <button class="action-btn-small btn-cancel" onclick="cancelAppointment(${appointment.id})">Cancelar</button>
                    </div>
                `;
                
                container.appendChild(appointmentItem);
            });
        }

        // Atualizar estatísticas
        function updateStats() {
            const today = new Date().toISOString().split('T')[0];
            const thisWeekStart = new Date();
            thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
            const thisWeekEnd = new Date(thisWeekStart);
            thisWeekEnd.setDate(thisWeekStart.getDate() + 6);
            
            const thisMonth = new Date().getMonth();
            const thisYear = new Date().getFullYear();
            
            // Contar agendamentos
            const todayCount = appointments.filter(app => 
                app.date === today && app.status === 'agendado'
            ).length;
            
            const weekCount = appointments.filter(app => {
                const appDate = new Date(app.date);
                return appDate >= thisWeekStart && appDate <= thisWeekEnd && app.status === 'agendado';
            }).length;
            
            const monthCount = appointments.filter(app => {
                const appDate = new Date(app.date);
                return appDate.getMonth() === thisMonth && 
                       appDate.getFullYear() === thisYear && 
                       app.status === 'agendado';
            }).length;
            
            // Atualizar elementos
            document.getElementById('todayCount').textContent = todayCount;
            document.getElementById('weekCount').textContent = weekCount;
            document.getElementById('monthCount').textContent = monthCount;
        }

        // Mostrar todos os agendamentos
        function showAllAppointments() {
            alert('Funcionalidade "Ver Todos" será implementada em breve!');
        }

        // Gerar relatório
        function generateReport() {
            const totalAgendamentos = appointments.length;
            const agendados = appointments.filter(app => app.status === 'agendado').length;
            const concluidos = appointments.filter(app => app.status === 'concluido').length;
            const cancelados = appointments.filter(app => app.status === 'cancelado').length;
            
            alert(`Relatório Rápido:
            
Total de Agendamentos: ${totalAgendamentos}
Agendados: ${agendados}
Concluídos: ${concluidos}
Cancelados: ${cancelados}`);
        }

        // Inicializar sistema quando a página carregar
        document.addEventListener('DOMContentLoaded', function() {
            initCalendar();
            updateTodayAppointments();
            
            // Fechar modal ao clicar fora dele
            window.addEventListener('click', function(event) {
                const modal = document.getElementById('appointmentModal');
                if (event.target === modal) {
                    closeModal();
                }
            });
        });


        // Função para mostrar toast no canto (recomendada)
        function showSuccessToast(message) {
            // Remove toast anterior se existir
            const existingToast = document.querySelector('.success-message');
            if (existingToast) {
                existingToast.remove();
            }

            // Cria novo toast
            const toast = document.createElement('div');
            toast.className = 'success-message';
            toast.innerHTML = `
                <span class="icon">✓</span>
                <span>${message}</span>
                <button class="close-btn" onclick="this.parentElement.remove()">×</button>
            `;

            document.body.appendChild(toast);

            // Mostra o toast
            setTimeout(() => toast.classList.add('show'), 100);

            // Remove automaticamente após 4 segundos
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.classList.remove('show');
                    setTimeout(() => toast.remove(), 300);
                }
            }, 4000);
        }

        // Função para mostrar modal no centro
        function showSuccessModal(message) {
            const overlay = document.getElementById('overlay');
            
            // Remove modal anterior se existir
            const existingModal = document.querySelector('.toast-center');
            if (existingModal) {
                existingModal.remove();
            }

            // Cria novo modal
            const modal = document.createElement('div');
            modal.className = 'toast-center';
            modal.innerHTML = `
                <div class="icon">✓</div>
                <h3>Sucesso!</h3>
                <p>${message}</p>
            `;

            document.body.appendChild(modal);
            overlay.classList.add('show');

            // Mostra o modal
            setTimeout(() => modal.classList.add('show'), 100);

            // Remove após 3 segundos ou ao clicar no overlay
            const closeModal = () => {
                modal.classList.remove('show');
                overlay.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            };

            overlay.onclick = closeModal;
            setTimeout(closeModal, 3000);
        }

        // SUA FUNÇÃO MODIFICADA - Salvar agendamento
        document.getElementById('appointmentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const appointmentData = {
                clientName: document.getElementById('clientName').value,
                clientPhone: document.getElementById('clientPhone').value,
                clientEmail: document.getElementById('clientEmail').value,
                serviceType: document.getElementById('serviceType').value,
                date: document.getElementById('appointmentDate').value,
                time: document.getElementById('appointmentTime').value,
                address: document.getElementById('clientAddress').value,
                observations: document.getElementById('observations').value,
                status: 'agendado'
            };
            
            if (editingAppointment) {
                // Editando agendamento existente
                const index = appointments.findIndex(app => app.id === editingAppointment.id);
                appointments[index] = { ...appointmentData, id: editingAppointment.id };
                
                // SUBSTITUA O ALERT POR UMA DESSAS OPÇÕES:
                showSuccessToast('Agendamento atualizado com sucesso!');
                // OU
                // showSuccessModal('Agendamento atualizado com sucesso!');
                
            } else {
                // Novo agendamento
                appointmentData.id = Date.now();
                appointments.push(appointmentData);
                
                // SUBSTITUA O ALERT POR UMA DESSAS OPÇÕES:
                showSuccessToast('Agendamento criado com sucesso!');
                // OU 
                // showSuccessModal('Agendamento criado com sucesso!');
            }

            // Limpar formulário após salvar
            this.reset();
            editingAppointment = null;
        });
        