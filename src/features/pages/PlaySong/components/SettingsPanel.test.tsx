// import { describe, it, expect, jest } from 'bun:test';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsPanel from './SettingsPanel';
import { describe, expect, it, mock } from 'bun:test';
import React from 'react';
import { getDefaultSongSettings } from '@/features/SongVisualization/utils';
import { SongConfig } from '@/types';

describe('SettingsPanel', () => {
    describe('handleVisualization', () => {
        it('should force instrument as piano when choosing falling-notes', async () => {
            const onChange = mock(() => {});
            const props: SongConfig = getDefaultSongSettings();

            const { getByRole } = render(<SettingsPanel config={{...props, visualization: 'falling-notes', instrument: 'piano'}}/>);
            
            expect(getByRole('radio', { name: /piano/i }).checked).toEqual(true)
            expect(getByRole('radio', { name: /drums/i }).checked).toEqual(false)
            
            userEvent.click(getByRole('radio', { name: /drums/i }));

            await waitFor (() => {
                expect(getByRole('radio', { name: /piano/i }).checked).toEqual(false)
            //     expect(getByRole('radio', { name: /drums/i }).checked).toEqual(true)
            });
            
            // userEvent.click(getByRole('radio', { name: /falling notes/i }));
            
            // await waitFor (() => {
            //     expect(getByRole('radio', { name: /piano/i }).checked).toEqual(true)
            // });
        });
    });

    describe.skip('handleInstrument', () => {
        it('should force visualization for sheet when choosing drums', () => {
            const onChange = jest.fn();
            const { getByRole } = render(<SettingsPanel config={{visualization: 'falling-notes', instrument: 'drums'}} onChange={onChange} />);
            userEvent.click(getByRole('radio', { name: /drums/i }));
            expect(onChange).toHaveBeenCalledWith({visualization: 'sheet', instrument: 'drums'});
        });
    });
});